import { LogoutOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Button, Layout, Modal, Space, Typography, message } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RouteConfig } from '../../../constants';
import { useAuth } from '../../../contexts/AuthContext';

const { Title, Text } = Typography;
const { Content } = Layout;

export const FormLogout = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        setShowModal(true);
    }, []);

    const handleLogout = async () => {
        setIsLoading(true);
        try {
            // Gọi hàm logout từ context để xóa accessToken
            logout();
            message.success('Đăng xuất thành công!');
            navigate(RouteConfig.LoginPage.path);
        } catch (error) {
            message.error('Có lỗi xảy ra khi đăng xuất!');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        setShowModal(false);
        navigate('/');
    };

    return (
        <Layout
            style={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #fef2f2 0%, #fce7f3 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px'
            }}
        >
            <Content style={{ maxWidth: '400px', width: '100%' }}>
                <Modal
                    title={
                        <Space>
                            <QuestionCircleOutlined style={{ color: '#f59e0b' }} />
                            <span>Xác nhận đăng xuất</span>
                        </Space>
                    }
                    open={showModal}
                    onCancel={handleCancel}
                    footer={[
                        <Button key='cancel' onClick={handleCancel}>
                            Hủy
                        </Button>,
                        <Button
                            key='logout'
                            type='primary'
                            danger
                            loading={isLoading}
                            onClick={handleLogout}
                            icon={<LogoutOutlined />}
                        >
                            Đăng xuất
                        </Button>
                    ]}
                    centered
                    width={400}
                    style={{ borderRadius: '8px' }}
                >
                    <div style={{ paddingTop: '16px', paddingBottom: '16px' }}>
                        <Text style={{ fontSize: '16px' }}>Bạn có chắc chắn muốn đăng xuất khỏi hệ thống không?</Text>
                        <div
                            style={{
                                marginTop: '12px',
                                padding: '12px',
                                background: '#fef3c7',
                                borderRadius: '8px',
                                border: '1px solid #fde68a'
                            }}
                        >
                            <Text type='secondary' style={{ fontSize: '14px' }}>
                                💡 Sau khi đăng xuất, bạn sẽ cần đăng nhập lại để tiếp tục sử dụng hệ thống.
                            </Text>
                        </div>
                    </div>
                </Modal>
            </Content>
        </Layout>
    );
};
