import { Breadcrumb, Button, Form, Input, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { RouteConfig } from '../../../constants';
import axios from 'axios';

interface GenresFormValues {
    genreName: string;
    description?: string;
}

interface FormMutationGenresPageProps {
    _id?: string;
}

export default function FormMutationGenresPage({ _id }: FormMutationGenresPageProps) {
    const navigate = useNavigate();
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<GenresFormValues>({
        defaultValues: { genreName: '', description: '' }
    });

    useEffect(() => {
        if (_id) {
            // Lấy dữ liệu genres từ API để fill form khi sửa
            axios.get(`http://localhost:3000/genres/${_id}`).then((res) => {
                reset({
                    genreName: res.data.genrename,
                    description: res.data.description
                });
            });
        } else {
            reset({ genreName: '', description: '' });
        }
    }, [_id, reset]);

    const onSubmit = async (values: GenresFormValues) => {
        if (_id) {
            await axios.put(`http://localhost:3000/genres/${_id}`, {
                GenreName: values.genreName,
                Description: values.description
            });
        } else {
            await axios.post('http://localhost:3000/genres', {
                GenreName: values.genreName,
                Description: values.description
            });
        }
        navigate(RouteConfig.ListGenresPage.path);
    };

    return (
        <Spin spinning={false}>
            <div>
                <div className='flex justify-between items-center mb-6'>
                    <Breadcrumb
                        items={[
                            {
                                title: 'Quản lý thể loại',
                                onClick: () => navigate(RouteConfig.ListGenresPage.path),
                                className: 'cursor-pointer'
                            },
                            { title: _id ? 'Cập nhật thể loại' : 'Tạo mới thể loại' }
                        ]}
                    />
                    <div className='flex gap-2'>
                        <Button onClick={() => navigate(RouteConfig.ListGenresPage.path)}>Hủy</Button>
                        <Button type='primary' htmlType='submit' form='genres-form'>
                            Lưu
                        </Button>
                    </div>
                </div>
                <Form id='genres-form' layout='vertical' onFinish={handleSubmit(onSubmit)}>
                    <div className='grid grid-cols-2 gap-4'>
                        <Controller
                            name='genreName'
                            control={control}
                            render={({ field }) => (
                                <Form.Item label='Tên thể loại' help={errors.genreName?.message} required>
                                    <Input placeholder='Nhập tên thể loại' {...field} />
                                </Form.Item>
                            )}
                        />
                        <Controller
                            name='description'
                            control={control}
                            render={({ field }) => (
                                <Form.Item label='Mô tả' help={errors.description?.message}>
                                    <Input placeholder='Nhập mô tả' {...field} />
                                </Form.Item>
                            )}
                        />
                    </div>
                </Form>
            </div>
        </Spin>
    );
}
