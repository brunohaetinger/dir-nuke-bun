// index.js
import React, { useEffect, useState } from 'react';
import { render, Text, Box } from 'ink';
import SelectInput from 'ink-select-input';
import { rm } from "node:fs/promises";
const getNodeModulesFolders = (dir: string): Promise<{ label: string; value: string }[]> => {
	return new Promise(async (resolve) => {
		try {
			const proc = Bun.spawn([
				"find",
				dir,
				"-type",
				"d",
				"-name",
				"node_modules",
				"-prune",
				"-exec",
				"du",
				"-sh",
				"{}",
				"+"
			]);

			const stdout = await new Response(proc.stdout).text();
			const exitCode = await proc.exited;

			if (exitCode !== 0) {
				const stderr = await new Response(proc.stderr).text();
				console.error("Error executing find command:", stderr);
				return resolve([]);
			}

			const lines = stdout
				.trim()
				.split('\n')
				.map((line: string) => {
					const [size, folder] = line.split('\t');
					return {
						label: `${size} - ${folder || ''}`,
						value: folder || ''
					};
				});
			resolve(lines);
		} catch (error) {
			console.error("Error in getNodeModulesFolders:", error);
			resolve([]);
		}
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
				onSelect={async (item) => {
					if (item.value === 'DELETE_ALL') {
						for (const folder of folders) {
							await rm(String(folder.value), { recursive: true, force: true });
						}
						setDeleted(folders.map((f) => f.value));
					} else {
						await rm(String(item.value), { recursive: true, force: true });
						setDeleted((prevDeleted) => [...prevDeleted, String(item.value)]);
					}
				}}
			/>
		</Box>
	);
};

render(<App dir={process.argv[2] || '.'} />);
