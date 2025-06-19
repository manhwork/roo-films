import React from 'react';
import FormMutationGenresPage from './FormMutationGenresPage';
import { useParams } from 'react-router-dom';
const UpdateGenresPage: React.FC = () => {
    const { id } = useParams();
    return <FormMutationGenresPage _id={id} />;
};

export default UpdateGenresPage;
