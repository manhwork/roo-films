import { Breadcrumb, Button, Form, Input, Spin, Switch } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { RouteConfig } from '../../../constants';
import axios from 'axios';

interface UserFormValues {
    username: string;
    fullName?: string;
    email: string;
    avatar?: string;
    isActive?: boolean;
    isAdmin?: boolean;
    password?: string; // chỉ dùng khi tạo mới
}

interface FormMutationUserPageProps {
    _id?: string;
}

export default function FormMutationUserPage({ _id }: FormMutationUserPageProps) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<UserFormValues>({
        defaultValues: {
            username: '',
            fullName: '',
            email: '',
            avatar: '',
            isActive: true,
            isAdmin: false,
            password: ''
        }
    });

    useEffect(() => {
        if (_id) {
            setLoading(true);
            axios
                .get(`http://localhost:3000/users/${_id}`)
                .then((res) => {
                    reset({
                        username: res.data.username,
                        fullName: res.data.fullname,
                        email: res.data.email,
                        avatar: res.data.avatar,
                        isActive: res.data.isactive,
                        isAdmin: res.data.isadmin,
                        password: res.data.password || '' // password có thể không trả về
                    });
                })
                .finally(() => setLoading(false));
        } else {
            reset({ username: '', fullName: '', email: '', avatar: '', isActive: true, isAdmin: false, password: '' });
        }
    }, [_id, reset]);

    const onSubmit = async (values: UserFormValues) => {
        setLoading(true);
        try {
            if (_id) {
                await axios.put(`http://localhost:3000/users/${_id}`, {
                    FullName: values.fullName,
                    Avatar: values.avatar,
                    IsActive: values.isActive,
                    IsAdmin: values.isAdmin
                });
            } else {
                await axios.post('http://localhost:3000/users', {
                    Username: values.username,
                    Password: values.password,
                    Email: values.email,
                    FullName: values.fullName,
                    Avatar: values.avatar
                });
            }
            navigate(RouteConfig.ListUserPage.path);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Spin spinning={loading}>
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
                                    <Input placeholder='Nhập tên đăng nhập' {...field} disabled={!!_id} />
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
                                    <Input placeholder='Nhập email' {...field} disabled={!!_id} />
                                </Form.Item>
                            )}
                        />
                        <Controller
                            name='avatar'
                            control={control}
                            render={({ field }) => (
                                <Form.Item label='Avatar'>
                                    <Input placeholder='Nhập link avatar' {...field} />
                                </Form.Item>
                            )}
                        />
                        {!_id && (
                            <Controller
                                name='password'
                                control={control}
                                render={({ field }) => (
                                    <Form.Item label='Mật khẩu' help={errors.password?.message} required>
                                        <Input.Password placeholder='Nhập mật khẩu' {...field} />
                                    </Form.Item>
                                )}
                            />
                        )}
                        <Controller
                            name='isActive'
                            control={control}
                            render={({ field }) => (
                                <Form.Item label='Kích hoạt'>
                                    <Switch checked={field.value} onChange={field.onChange} />
                                </Form.Item>
                            )}
                        />
                        <Controller
                            name='isAdmin'
                            control={control}
                            render={({ field }) => (
                                <Form.Item label='Quản trị viên'>
                                    <Switch checked={field.value} onChange={field.onChange} />
                                </Form.Item>
                            )}
                        />
                    </div>
                </Form>
            </div>
        </Spin>
    );
}
