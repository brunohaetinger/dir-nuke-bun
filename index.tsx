// index.js
import React, { useEffect, useState } from 'react';
import { render, Text, Box } from 'ink';
import SelectInput from 'ink-select-input';
import { exec } from 'child_process';
import fs from 'fs';

const getNodeModulesFolders = (dir: string): Promise<{ label: string; value: string }[]> => {
	return new Promise((resolve) => {
		exec(
			`find ${dir} -type d -name node_modules -prune -exec du -sh {} +`,
			(err, stdout) => {
				if (err) return resolve([]);
				const lines = stdout
					.trim()
					.split('\n')
					.map((line) => {
						const [size, folder] = line.split('\t');
						return {
							label: `${size} - ${folder || ''}`, // Ensure folder is a string
							value: folder || '' // Ensure folder is a string
						};
					});
				resolve(lines);
			}
		);
	});
};

const App = ({ dir = '.' }: { dir?: string }) => {
	const [folders, setFolders] = useState<{ label: string; value: string }[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [deleted, setDeleted] = useState<string[]>([]);

	useEffect(() => {
		getNodeModulesFolders(dir).then((results) => {
			setFolders(results);
			setLoading(false);
		});
	}, [dir]);

	if (loading) {
		return <Text color="cyan">Searching for node_modules...</Text>;
	}

	if (folders.length === 0) {
		return <Text color="yellow">No node_modules found.</Text>;
	}

	if (deleted.length > 0) {
		return (
			<Box flexDirection="column">
				<Text color="green">✅ Deleted:</Text>
				{deleted.map((item, i) => (
					<Text key={i}>• {item}</Text>
				))}
			</Box>
		);
	}

	return (
		<Box flexDirection="column">
			<Text>Select a node_modules folder to delete (or choose "Delete All"):</Text>
			<SelectInput
				items={[
					...folders,
					{ label: 'Delete All node_modules folders', value: 'DELETE_ALL' }
				]}
				onSelect={(item) => {
					if (item.value === 'DELETE_ALL') {
						for (const folder of folders) {
							fs.rmSync(String(folder.value), { recursive: true, force: true });
						}
						setDeleted(folders.map((f) => f.value));
					} else {
						fs.rmSync(String(item.value), { recursive: true, force: true });
						setDeleted((prevDeleted) => [...prevDeleted, String(item.value)]);
					}
				}}
			/>
		</Box>
	);
};

render(<App dir={process.argv[2] || '.'} />);
