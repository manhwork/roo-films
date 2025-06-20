import { Breadcrumb, Button, Form, Input, Spin, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { RouteConfig } from '../../../constants';
import axios from 'axios';

interface ContentFormValues {
    title: string;
    originalTitle?: string;
    description?: string;
    type?: string;
    releaseDate?: string;
    imdbRating?: number;
    posterURL?: string;
    status?: string;
    country?: string;
    language?: string;
}

interface FormMutationContentPageProps {
    _id?: string;
}

export default function FormMutationContentPage({ _id }: FormMutationContentPageProps) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<ContentFormValues>({
        defaultValues: {
            title: '',
            originalTitle: '',
            description: '',
            type: '',
            releaseDate: '',
            imdbRating: undefined,
            posterURL: '',
            status: '',
            country: '',
            language: ''
        }
    });

    useEffect(() => {
        if (_id) {
            setLoading(true);
            axios
                .get(`http://localhost:3000/contents/${_id}`)
                .then((res) => {
                    reset({
                        title: res.data.title,
                        originalTitle: res.data.originaltitle,
                        description: res.data.description,
                        type: res.data.type,
                        releaseDate: res.data.releasedate,
                        imdbRating: res.data.imdbrating,
                        posterURL: res.data.posterurl,
                        status: res.data.status,
                        country: res.data.country,
                        language: res.data.language
                    });
                })
                .finally(() => setLoading(false));
        } else {
            reset({
                title: '',
                originalTitle: '',
                description: '',
                type: '',
                releaseDate: '',
                imdbRating: undefined,
                posterURL: '',
                status: '',
                country: '',
                language: ''
            });
        }
    }, [_id, reset]);

    const onSubmit = async (values: ContentFormValues) => {
        setLoading(true);
        try {
            if (_id) {
                await axios.put(`http://localhost:3000/contents/${_id}`, {
                    Title: values.title,
                    OriginalTitle: values.originalTitle,
                    Description: values.description,
                    Type: values.type, // thêm dòng này
                    ReleaseDate: values.releaseDate,
                    IMDBRating: values.imdbRating,
                    PosterURL: values.posterURL,
                    Status: values.status,
                    Country: values.country,
                    Language: values.language
                });
                message.success('Cập nhật nội dung thành công');
            } else {
                await axios.post('http://localhost:3000/contents', {
                    Title: values.title,
                    OriginalTitle: values.originalTitle,
                    Description: values.description,
                    Type: values.type,
                    ReleaseDate: values.releaseDate,
                    IMDBRating: values.imdbRating,
                    PosterURL: values.posterURL,
                    Status: values.status,
                    Country: values.country,
                    Language: values.language
                });
                message.success('Tạo mới nội dung thành công');
            }
            navigate(RouteConfig.ListContentPage.path);
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
                            name='description'
                            control={control}
                            render={({ field }) => (
                                <Form.Item label='Mô tả' help={errors.description?.message}>
                                    <Input.TextArea placeholder='Nhập mô tả' {...field} />
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
                            name='posterURL'
                            control={control}
                            render={({ field }) => (
                                <Form.Item label='Poster URL' help={errors.posterURL?.message}>
                                    <Input placeholder='Nhập poster URL' {...field} />
                                </Form.Item>
                            )}
                        />
                        <Controller
                            name='status'
                            control={control}
                            render={({ field }) => (
                                <Form.Item label='Trạng thái' help={errors.status?.message}>
                                    <Input placeholder='Ongoing/Completed/Canceled' {...field} />
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
