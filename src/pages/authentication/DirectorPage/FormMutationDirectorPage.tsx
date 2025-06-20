import { Breadcrumb, Button, Form, Input, Spin, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { RouteConfig } from '../../../constants';
import axios from 'axios';

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
    const [loading, setLoading] = useState(false);

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
            setLoading(true);
            axios
                .get(`http://localhost:3000/directors/${_id}`)
                .then((res) => {
                    reset({
                        name: res.data.name,
                        originalName: res.data.originalname,
                        bio: res.data.bio,
                        birthDate: res.data.birthdate,
                        nationality: res.data.nationality,
                        photoURL: res.data.photourl
                    });
                })
                .catch(() => message.error('Không tìm thấy đạo diễn'))
                .finally(() => setLoading(false));
        } else {
            reset({ name: '', originalName: '', bio: '', birthDate: '', nationality: '', photoURL: '' });
        }
    }, [_id, reset]);

    const onSubmit = async (values: DirectorFormValues) => {
        setLoading(true);
        try {
            if (_id) {
                await axios.put(`http://localhost:3000/directors/${_id}`, {
                    Name: values.name,
                    OriginalName: values.originalName,
                    Bio: values.bio,
                    BirthDate: values.birthDate,
                    Nationality: values.nationality,
                    PhotoURL: values.photoURL
                });
                message.success('Cập nhật thành công');
            } else {
                await axios.post('http://localhost:3000/directors', {
                    Name: values.name,
                    OriginalName: values.originalName,
                    Bio: values.bio,
                    BirthDate: values.birthDate,
                    Nationality: values.nationality,
                    PhotoURL: values.photoURL
                });
                message.success('Tạo mới thành công');
            }
            navigate(RouteConfig.ListDirectorPage.path);
        } catch {
            message.error('Lưu thất bại');
        }
        setLoading(false);
    };

    return (
        <Spin spinning={loading}>
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
