import { Breadcrumb, Button, Form, Input, Spin, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { RouteConfig } from '../../../constants';
import axios from 'axios';

interface SeasonFormValues {
    title?: string;
    seasonNumber: number;
    posterURL?: string;
    releaseDate?: string;
    episodeCount: number;
}

interface FormMutationSeasonOfContentPageProps {
    _id?: string;
}

export default function FormMutationSeasonOfContentPage({ _id }: FormMutationSeasonOfContentPageProps) {
    const navigate = useNavigate();
    const { contentId } = useParams();
    const [loading, setLoading] = useState(false);

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<SeasonFormValues>({
        defaultValues: {
            title: '',
            seasonNumber: 1,
            posterURL: '',
            releaseDate: '',
            episodeCount: 0
        }
    });

    useEffect(() => {
        if (_id && contentId) {
            setLoading(true);
            axios
                .get(`http://localhost:3000/contents/${contentId}/seasons/${_id}`)
                .then((res) => {
                    reset({
                        title: res.data.title,
                        seasonNumber: res.data.seasonnumber,
                        posterURL: res.data.posterurl,
                        releaseDate: res.data.releasedate,
                        episodeCount: res.data.episodecount
                    });
                })
                .finally(() => setLoading(false));
        } else {
            reset({
                title: '',
                seasonNumber: 1,
                posterURL: '',
                releaseDate: '',
                episodeCount: 0
            });
        }
    }, [_id, contentId, reset]);

    const onSubmit = async (values: SeasonFormValues) => {
        setLoading(true);
        try {
            if (_id) {
                await axios.put(`http://localhost:3000/contents/${contentId}/seasons/${_id}`, {
                    SeasonNumber: values.seasonNumber, // thêm dòng này
                    Title: values.title,
                    PosterURL: values.posterURL,
                    ReleaseDate: values.releaseDate,
                    EpisodeCount: values.episodeCount
                });
                message.success('Cập nhật mùa thành công');
            } else {
                await axios.post(`http://localhost:3000/contents/${contentId}/seasons`, {
                    SeasonNumber: values.seasonNumber,
                    Title: values.title,
                    PosterURL: values.posterURL,
                    ReleaseDate: values.releaseDate,
                    EpisodeCount: values.episodeCount
                });
                message.success('Tạo mùa mới thành công');
            }
            navigate(RouteConfig.ListSeasonOfContentPage.getPath(String(contentId)));
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
                                title: 'Quản lý mùa',
                                onClick: () => navigate(RouteConfig.ListSeasonOfContentPage.getPath(String(contentId))),
                                className: 'cursor-pointer'
                            },
                            { title: _id ? 'Cập nhật mùa' : 'Tạo mới mùa' }
                        ]}
                    />
                    <div className='flex gap-2'>
                        <Button
                            onClick={() => navigate(RouteConfig.ListSeasonOfContentPage.getPath(String(contentId)))}
                        >
                            Hủy
                        </Button>
                        <Button type='primary' htmlType='submit' form='season-form'>
                            Lưu
                        </Button>
                    </div>
                </div>
                <Form id='season-form' layout='vertical' onFinish={handleSubmit(onSubmit)}>
                    <div className='grid grid-cols-2 gap-4'>
                        <Controller
                            name='title'
                            control={control}
                            render={({ field }) => (
                                <Form.Item label='Tên mùa' help={errors.title?.message} required>
                                    <Input placeholder='Nhập tên mùa' {...field} />
                                </Form.Item>
                            )}
                        />
                        <Controller
                            name='seasonNumber'
                            control={control}
                            render={({ field }) => (
                                <Form.Item label='Số mùa' help={errors.seasonNumber?.message} required>
                                    <Input type='number' placeholder='Số mùa' {...field} />
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
                            name='releaseDate'
                            control={control}
                            render={({ field }) => (
                                <Form.Item label='Ngày phát hành' help={errors.releaseDate?.message}>
                                    <Input placeholder='YYYY-MM-DD' {...field} />
                                </Form.Item>
                            )}
                        />
                        <Controller
                            name='episodeCount'
                            control={control}
                            render={({ field }) => (
                                <Form.Item label='Số tập' help={errors.episodeCount?.message} required>
                                    <Input type='number' placeholder='Số tập' {...field} />
                                </Form.Item>
                            )}
                        />
                    </div>
                </Form>
            </div>
        </Spin>
    );
}
