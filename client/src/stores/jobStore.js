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
	addJob: async (newJob) => {
		try {
			// Make a POST request to add a new job
			const res = await fetch('http://localhost:8080/api/jobs/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(newJob),
			});

			if (!res.ok) {
				throw new Error('Network response was not ok');
			}

			// Update the jobs state with the new job
			const addedJob = await res.json();
			set((state) => ({
				jobs: [...state.jobs, addedJob],
				error: null,
			}));
		} catch (error) {
			set({ error });
		}
	},
}));

export default jobStore;
