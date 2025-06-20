import { useParams } from 'react-router-dom';
import FormMutationUserPage from './FormMutationUserPage';

export default function UpdateUserPage() {
    const { id } = useParams();
    console.log('UpdateUserPage id:', id);

    return <FormMutationUserPage _id={id} />;
}
