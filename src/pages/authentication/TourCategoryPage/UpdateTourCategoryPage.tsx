import { useParams } from 'react-router-dom';
import { FormMutationTourCategoryPage } from './components/FormMutationTourCategoryPage';

export default function UpdateTourCategoryPage() {
    const { id } = useParams();
    return <FormMutationTourCategoryPage _id={id} />;
}
