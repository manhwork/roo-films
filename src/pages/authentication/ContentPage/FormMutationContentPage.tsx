import { Breadcrumb, Button, Form, Input, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { RouteConfig } from '../../../constants';

interface ContentFormValues {
    title: string;
    originalTitle?: string;
    type?: string;
    releaseDate?: string;
    imdbRating?: number;
    country?: string;
    language?: string;
}

interface FormMutationContentPageProps {
    _id?: string;
}

export default function FormMutationContentPage({ _id }: FormMutationContentPageProps) {
    const navigate = useNavigate();
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<ContentFormValues>({
        defaultValues: {
            title: '',
            originalTitle: '',
            type: '',
            releaseDate: '',
            imdbRating: undefined,
            country: '',
            language: ''
        }
    });

    useEffect(() => {
        if (_id) {
            reset({
                title: 'Bố Già',
                originalTitle: 'Bo Gia',
                type: 'movie',
                releaseDate: '2021-03-05',
                imdbRating: 8.1,
                country: 'Việt Nam',
                language: 'Tiếng Việt'
            });
        } else {
            reset({
                title: '',
                originalTitle: '',
                type: '',
                releaseDate: '',
                imdbRating: undefined,
                country: '',
                language: ''
            });
        }
    }, [_id, reset]);

    const onSubmit = (values: ContentFormValues) => {
        if (_id) {
            console.log('Update content:', values);
        } else {
            console.log('Create content:', values);
        }
        navigate(RouteConfig.ListContentPage.path);
    };

    return (
        <Spin spinning={false}>
            <div>
                <div className='flex justify-between items-center mb-6'>
                    <Breadcrumb
                        items={[
                            {
                                title: 'Quản lý nội dung',
                                onClick: () => navigate(RouteConfig.ListContentPage.path),
                                className: 'cursor-pointer'
                            },
                            { title: _id ? 'Cập nhật nội dung' : 'Tạo mới nội dung' }
                        ]}
                    />
                    <div className='flex gap-2'>
                        <Button onClick={() => navigate(RouteConfig.ListContentPage.path)}>Hủy</Button>
                        <Button type='primary' htmlType='submit' form='content-form'>
                            Lưu
                        </Button>
                    </div>
                </div>
                <Form id='content-form' layout='vertical' onFinish={handleSubmit(onSubmit)}>
                    <div className='grid grid-cols-2 gap-4'>
                        <Controller
                            name='title'
                            control={control}
                            render={({ field }) => (
                                <Form.Item label='Tên phim' help={errors.title?.message} required>
                                    <Input placeholder='Nhập tên phim' {...field} />
                                </Form.Item>
                            )}
                        />
                        <Controller
                            name='originalTitle'
                            control={control}
                            render={({ field }) => (
                                <Form.Item label='Tên gốc' help={errors.originalTitle?.message}>
                                    <Input placeholder='Nhập tên gốc' {...field} />
                                </Form.Item>
                            )}
                        />
                        <Controller
                            name='type'
                            control={control}
                            render={({ field }) => (
                                <Form.Item label='Loại' help={errors.type?.message}>
                                    <Input placeholder='movie/tvshow' {...field} />
                                </Form.Item>
                            )}
                        />
                        <Controller
                            name='releaseDate'
                            control={control}
                            render={({ field }) => (
                                <Form.Item label='Ngày phát hành' help={errors.releaseDate?.message}>
                                    <Input placeholder='YYYY-MM-DD' {...field} />
                                </Form.Item>
                            )}
                        />
                        <Controller
                            name='imdbRating'
                            control={control}
                            render={({ field }) => (
                                <Form.Item label='IMDB' help={errors.imdbRating?.message}>
                                    <Input type='number' placeholder='IMDB' {...field} />
                                </Form.Item>
                            )}
                        />
                        <Controller
                            name='country'
                            control={control}
                            render={({ field }) => (
                                <Form.Item label='Quốc gia' help={errors.country?.message}>
                                    <Input placeholder='Nhập quốc gia' {...field} />
                                </Form.Item>
                            )}
                        />
                        <Controller
                            name='language'
                            control={control}
                            render={({ field }) => (
                                <Form.Item label='Ngôn ngữ' help={errors.language?.message}>
                                    <Input placeholder='Nhập ngôn ngữ' {...field} />
                                </Form.Item>
                            )}
                        />
                    </div>
                </Form>
            </div>
        </Spin>
    );
}
