import React from 'react';
import FormMutationDirectorPage from './FormMutationDirectorPage';
import { useParams } from 'react-router-dom';
const UpdateDirectorPage: React.FC = () => {
    const { id } = useParams();

    return <FormMutationDirectorPage _id={id} />;
};

export default UpdateDirectorPage;
