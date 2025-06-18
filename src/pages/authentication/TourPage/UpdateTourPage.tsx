import { Navigate, useParams } from 'react-router-dom';
import { FormMutationTourPage } from './components/FormMutationTourPage';
import { RouteConfig } from '../../../constants';

export const UpdateTourPage = () => {
    const { id } = useParams();

    if (!id) {
        // Chuyển về trang 404
        return <Navigate to={RouteConfig.NotFoundPage.path} />;
    }

    return <FormMutationTourPage _id={id} />;
};
