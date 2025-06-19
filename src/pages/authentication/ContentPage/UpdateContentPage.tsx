import React from 'react';
import FormMutationContentPage from './FormMutationContentPage';
import { useParams } from 'react-router-dom';
const UpdateContentPage: React.FC = () => {
    const { id } = useParams();
    return <FormMutationContentPage _id={id} />;
};

export default UpdateContentPage;
