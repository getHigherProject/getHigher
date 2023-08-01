import { create } from 'zustand';

const jobStore = create((set) => ({
	jobs: [],
	error: null,

	fetchJobs: async () => {
		try {
			// Fetch the jobs
			console.log('Sending request to fetch jobs...');
			const res = await fetch('http://localhost:8080/api/jobs/');
			if (!res.ok) {
				throw new Error('Network response was not ok');
			}
			const data = await res.json();
			console.log('Response:', data);
			// Set to state
			set({ jobs: data, error: null });
		} catch (error) {
			set({ error });
		}
	},
	fetchSingleJob: async (id) => {
		try {
			// Fetch the single job by id
			const res = await fetch(`http://localhost:8080/api/jobs/${id}`);
			if (!res.ok) {
				throw new Error('Network response was not ok');
			}
			const data = await res.json();
			set({ singleJob: data, error: null }); // Wrap the single job in an array
		} catch (error) {
			set({ error });
		}
	},
}));

export default jobStore;
