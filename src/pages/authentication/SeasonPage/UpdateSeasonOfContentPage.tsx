import FormMutationSeasonOfContentPage from './FormMutationSeasonOfContentPage';
import { useParams } from 'react-router-dom';

export default function UpdateSeasonOfContentPage() {
    const { seasonId } = useParams();
    return <FormMutationSeasonOfContentPage _id={String(seasonId)} />;
}
