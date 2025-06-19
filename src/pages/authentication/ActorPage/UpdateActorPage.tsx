import React from 'react';
import FormMutationActorPage from './FormMutationActor';
import { useParams } from 'react-router-dom';
const UpdateActorPage: React.FC = () => {
    const { id } = useParams();

    return <FormMutationActorPage _id={id} />;
};

export default UpdateActorPage;
