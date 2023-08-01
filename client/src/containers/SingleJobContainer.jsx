import React, { useEffect } from 'react';

import SingleJob from '../components/SingleJob';
import jobStore from '../stores/jobStore';
import { useParams } from 'react-router-dom';

const SingleJobContainer = () => {
	const store = jobStore();
	const { id } = useParams();
	const job = store.singleJob;
	const error = store.error;

	useEffect(() => {
		store.fetchSingleJob(id);
	}, [id]);

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	if (!job) {
		return <div>Loading...</div>;
	}

	return <SingleJob job={job} />;
};

export default SingleJobContainer;
