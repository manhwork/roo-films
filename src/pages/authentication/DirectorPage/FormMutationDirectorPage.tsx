import { Breadcrumb, Button, Form, Input, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { RouteConfig } from '../../../constants';

interface DirectorFormValues {
    name: string;
    originalName?: string;
    bio?: string;
    birthDate?: string;
    nationality?: string;
    photoURL?: string;
}

interface FormMutationDirectorPageProps {
    _id?: string;
}

export default function FormMutationDirectorPage({ _id }: FormMutationDirectorPageProps) {
    const navigate = useNavigate();
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<DirectorFormValues>({
        defaultValues: {
            name: '',
            originalName: '',
            bio: '',
            birthDate: '',
            nationality: '',
            photoURL: ''
        }
    });

    useEffect(() => {
        if (_id) {
            reset({
                name: 'Victor Vũ',
                originalName: 'Victor Vu',
                bio: 'Đạo diễn nổi tiếng',
                birthDate: '1975-11-25',
                nationality: 'Việt Nam',
                photoURL: 'https://i.imgur.com/4.jpg'
            });
        } else {
            reset({ name: '', originalName: '', bio: '', birthDate: '', nationality: '', photoURL: '' });
        }
    }, [_id, reset]);

    const onSubmit = (values: DirectorFormValues) => {
        if (_id) {
            console.log('Update director:', values);
        } else {
            console.log('Create director:', values);
        }
        navigate(RouteConfig.ListDirectorPage.path);
    };

    return (
        <Spin spinning={false}>
            <div>
                <div className='flex justify-between items-center mb-6'>
                    <Breadcrumb
                        items={[
                            {
                                title: 'Quản lý đạo diễn',
                                onClick: () => navigate(RouteConfig.ListDirectorPage.path),
                                className: 'cursor-pointer'
                            },
                            { title: _id ? 'Cập nhật đạo diễn' : 'Tạo mới đạo diễn' }
                        ]}
                    />
                    <div className='flex gap-2'>
                        <Button onClick={() => navigate(RouteConfig.ListDirectorPage.path)}>Hủy</Button>
                        <Button type='primary' htmlType='submit' form='director-form'>
                            Lưu
                        </Button>
                    </div>
                </div>
                <Form id='director-form' layout='vertical' onFinish={handleSubmit(onSubmit)}>
                    <div className='grid grid-cols-2 gap-4'>
                        <Controller
                            name='name'
                            control={control}
                            render={({ field }) => (
                                <Form.Item label='Tên đạo diễn' help={errors.name?.message} required>
                                    <Input placeholder='Nhập tên đạo diễn' {...field} />
                                </Form.Item>
                            )}
                        />
                        <Controller
                            name='originalName'
                            control={control}
                            render={({ field }) => (
                                <Form.Item label='Tên gốc' help={errors.originalName?.message}>
                                    <Input placeholder='Nhập tên gốc' {...field} />
                                </Form.Item>
                            )}
                        />
                        <Controller
                            name='birthDate'
                            control={control}
                            render={({ field }) => (
                                <Form.Item label='Ngày sinh' help={errors.birthDate?.message}>
                                    <Input placeholder='YYYY-MM-DD' {...field} />
                                </Form.Item>
                            )}
                        />
                        <Controller
                            name='nationality'
                            control={control}
                            render={({ field }) => (
                                <Form.Item label='Quốc tịch' help={errors.nationality?.message}>
                                    <Input placeholder='Nhập quốc tịch' {...field} />
                                </Form.Item>
                            )}
                        />
                    </div>
                    <Controller
                        name='bio'
                        control={control}
                        render={({ field }) => (
                            <Form.Item label='Tiểu sử' help={errors.bio?.message}>
                                <Input.TextArea placeholder='Nhập tiểu sử' rows={4} {...field} />
                            </Form.Item>
                        )}
                    />
                    <Controller
                        name='photoURL'
                        control={control}
                        render={({ field }) => (
                            <Form.Item label='Ảnh (URL)' help={errors.photoURL?.message}>
                                <Input placeholder='Nhập đường dẫn ảnh' {...field} />
                            </Form.Item>
                        )}
                    />
                </Form>
            </div>
        </Spin>
    );
}
