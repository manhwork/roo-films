import { useParams } from 'react-router-dom';
import FormMutationUserPage from './FormMutationUserPage';

export default function UpdateUserPage() {
    const { _id } = useParams();
    return <FormMutationUserPage _id={_id} />;
}
