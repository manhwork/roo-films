import { Breadcrumb, Button, Form, Input, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { RouteConfig } from '../../../constants';

interface UserFormValues {
    username: string;
    fullName?: string;
    email: string;
    isActive?: boolean;
    isAdmin?: boolean;
}

interface FormMutationUserPageProps {
    _id?: string;
}

export default function FormMutationUserPage({ _id }: FormMutationUserPageProps) {
    const navigate = useNavigate();
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<UserFormValues>({
        defaultValues: { username: '', fullName: '', email: '', isActive: true, isAdmin: false }
    });

    useEffect(() => {
        if (_id) {
            reset({
                username: 'admin',
                fullName: 'Quản trị viên',
                email: 'admin@gmail.com',
                isActive: true,
                isAdmin: true
            });
        } else {
            reset({ username: '', fullName: '', email: '', isActive: true, isAdmin: false });
        }
    }, [_id, reset]);

    const onSubmit = (values: UserFormValues) => {
        if (_id) {
            console.log('Update user:', values);
        } else {
            console.log('Create user:', values);
        }
        navigate(RouteConfig.ListUserPage.path);
    };

    return (
        <Spin spinning={false}>
            <div>
                <div className='flex justify-between items-center mb-6'>
                    <Breadcrumb
                        items={[
                            {
                                title: 'Quản lý người dùng',
                                onClick: () => navigate(RouteConfig.ListUserPage.path),
                                className: 'cursor-pointer'
                            },
                            { title: _id ? 'Cập nhật người dùng' : 'Tạo mới người dùng' }
                        ]}
                    />
                    <div className='flex gap-2'>
                        <Button onClick={() => navigate(RouteConfig.ListUserPage.path)}>Hủy</Button>
                        <Button type='primary' htmlType='submit' form='user-form'>
                            Lưu
                        </Button>
                    </div>
                </div>
                <Form id='user-form' layout='vertical' onFinish={handleSubmit(onSubmit)}>
                    <div className='grid grid-cols-2 gap-4'>
                        <Controller
                            name='username'
                            control={control}
                            render={({ field }) => (
                                <Form.Item label='Tên đăng nhập' help={errors.username?.message} required>
                                    <Input placeholder='Nhập tên đăng nhập' {...field} />
                                </Form.Item>
                            )}
                        />
                        <Controller
                            name='fullName'
                            control={control}
                            render={({ field }) => (
                                <Form.Item label='Họ tên' help={errors.fullName?.message}>
                                    <Input placeholder='Nhập họ tên' {...field} />
                                </Form.Item>
                            )}
                        />
                        <Controller
                            name='email'
                            control={control}
                            render={({ field }) => (
                                <Form.Item label='Email' help={errors.email?.message} required>
                                    <Input placeholder='Nhập email' {...field} />
                                </Form.Item>
                            )}
                        />
                    </div>
                </Form>
            </div>
        </Spin>
    );
}
