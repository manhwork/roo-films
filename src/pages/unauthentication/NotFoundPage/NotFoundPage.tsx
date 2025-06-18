import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

export const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <Result
            status='404'
            title='404'
            subTitle='Xin lỗi, trang bạn đang tìm kiếm không tồn tại.'
            extra={
                <Button type='primary' onClick={() => navigate('/')}>
                    Quay về trang chủ
                </Button>
            }
        />
    );
};
