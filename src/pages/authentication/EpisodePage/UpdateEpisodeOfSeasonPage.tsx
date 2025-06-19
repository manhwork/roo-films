import FormMutationEpisodeOfSeasonPage from './FormMutationEpisodeOfSeasonPage';
import { useParams } from 'react-router-dom';

export default function UpdateEpisodeOfSeasonPage() {
    const { episodeId } = useParams();
    return <FormMutationEpisodeOfSeasonPage _id={String(episodeId)} />;
}
