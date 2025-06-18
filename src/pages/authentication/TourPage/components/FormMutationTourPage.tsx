import { InboxOutlined, PlusOutlined } from '@ant-design/icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { Breadcrumb, Button, Form, Input, notification, Select, Spin, Switch, Upload, UploadProps } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { RouteConfig } from '../../../../constants';
import { TourCategory } from '../../../../models/TourCategory';
import { useTourCategories } from '../../TourCategoryPage/hooks/useTourQueries';
import { useCreateTour, useTour, useUpdateTour } from '../hooks/useTourQueries';
import { getMutationTour, TourSchema } from '../schema/FormTourPageSchema';
import { useShowNotification } from '../../../../components/Notification/Notification';

interface FormMutationTourPageProps {
    _id?: string;
}

export const FormMutationTourPage = ({ _id }: FormMutationTourPageProps) => {
    const navigate = useNavigate();
    const [fileList, setFileList] = useState<any[]>([]);
    const createTourMutation = useCreateTour();
    const updateTourMutation = useUpdateTour();
    const { data, isLoading } = useTour({ id: _id || '' });
    const initialData = data?.data;
    const { data: tourCategories } = useTourCategories();
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const showNotification = useShowNotification();

    const optionsCategory = tourCategories?.data?.hits.map((category: TourCategory) => ({
        value: category._id,
        label: category.title
    }));

    const {
        control,
        handleSubmit: formSubmit,
        formState: { errors },
        reset,
        setValue
    } = useForm<TourSchema>({
        resolver: zodResolver(getMutationTour)
    });

    useEffect(() => {
        if (initialData) {
            reset({
                title: initialData?.title,
                price: initialData?.price,
                discount: initialData?.discount,
                stock: initialData?.stock,
                status: initialData?.status,
                information: initialData?.information,
                schedule: initialData?.schedule,
                duration_days: initialData?.duration_days,
                images: initialData?.images,
                transportation: initialData?.transportation,
                category_id:
                    typeof initialData?.category_id === 'object'
                        ? initialData?.category_id?._id
                        : initialData?.category_id,
                is_featured: initialData?.is_featured,
                code: initialData?.code
            });
            // Set fileList từ images có sẵn
            if (initialData?.images?.length) {
                setFileList(
                    initialData.images.map((url: string) => ({
                        uid: url,
                        name: url.split('/').pop(),
                        status: 'done',
                        url: url
                    }))
                );
            }
        }
    }, [initialData, reset]);

    const handleFormSubmit = (data: TourSchema) => {
        if (_id) {
            updateTourMutation.mutate(
                { ...data, id: _id },
                {
                    onSuccess: () => {
                        showNotification('success', 'Cập nhật tour thành công', 'Tour đã được cập nhật thành công');
                        setTimeout(() => {
                            navigate(RouteConfig.ListTourPage.path);
                        }, 1000);
                    }
                }
            );
        } else {
            createTourMutation.mutate(data, {
                onSuccess: () => {
                    showNotification('success', 'Tạo tour mới thành công', 'Tour đã được tạo thành công');
                    setTimeout(() => {
                        navigate(RouteConfig.ListTourPage.path);
                    }, 1000);
                }
            });
        }
    };

    const options = [
        { value: 'active', label: <span>Hoạt động</span> },
        { value: 'inactive', label: <span>Dừng hoạt động</span> },
        { value: 'pending', label: <span>Chờ duyệt</span> }
    ];

    const optionsTransportation = [
        { value: 'bus', label: <span>Xe bus</span> },
        { value: 'train', label: <span>Tàu hỏa</span> },
        { value: 'airplane', label: <span>Máy bay</span> },
        { value: 'boat', label: <span>Thuyền</span> }
    ];

    const { Dragger } = Upload;

    const props: UploadProps = {
        name: 'image',
        multiple: true,
        maxCount: 5,
        action: 'https://book-tour-khaki.vercel.app/upload/single',
        withCredentials: true,
        fileList,
        onChange(info) {
            setFileList(info.fileList);

            if (info.file.status === 'done') {
                // Lúc này mới có file.response
                console.log('Response của file vừa upload:', info.file.response);
            }

            // Lấy mảng url ảnh đã upload thành công
            const imageUrls = info.fileList
                .filter((file) => file.status === 'done' && file.response?.data?.url)
                .map((file) => file.response.data.url);

            console.log('imageUrls', imageUrls);

            setValue('images', imageUrls);
        },
        onRemove(file) {
            console.log('file', file);
            const newImageUrls = imageUrls.filter((url) => url !== file.url);
            setImageUrls(newImageUrls);
            setValue('images', newImageUrls);
        },
        listType: 'picture',
        showUploadList: {
            showPreviewIcon: true,
            showRemoveIcon: true
        }
    };

    return (
        <Spin spinning={_id ? isLoading : false}>
            <div className=''>
                {/* Header với Breadcrumb và nút tạo mới */}
                <div className='flex justify-between items-center mb-6'>
                    <Breadcrumb
                        items={[
                            {
                                title: 'Quản lý tour',
                                onClick: () => navigate(RouteConfig.ListTourPage.path),
                                className: 'cursor-pointer'
                            },
                            {
                                title: _id ? 'Cập nhật tour' : 'Tạo mới tour'
                            }
                        ]}
                    />

                    <div className='flex gap-2'>
                        <Button onClick={() => navigate(RouteConfig.ListTourPage.path)}>Hủy</Button>
                        <Button
                            onClick={formSubmit(handleFormSubmit)}
                            type='primary'
                            htmlType='submit'
                            icon={_id ? <PlusOutlined /> : null}
                            loading={isLoading}
                        >
                            {_id ? 'Cập nhật' : 'Thêm mới'}
                        </Button>
                    </div>
                </div>

                {/* Form trong Card */}
                <Form className='grid grid-cols-1 gap-2' layout='vertical'>
                    <div className='grid grid-cols-4 gap-4'>
                        <Controller
                            name='title'
                            control={control}
                            render={({ field }) => (
                                <Form.Item label='Tên tour' help={errors.title?.message}>
                                    <Input placeholder='Nhập tên tour' type='text' {...field} />
                                </Form.Item>
                            )}
                        />

                        <Controller
                            name='stock'
                            control={control}
                            render={({ field }) => (
                                <Form.Item className='col-span-1' label='Số lượng' help={errors.stock?.message}>
                                    <Input type='number' className='w-full' placeholder='Nhập số lượng' {...field} />
                                </Form.Item>
                            )}
                        />

                        <Controller
                            name='price'
                            control={control}
                            render={({ field }) => (
                                <Form.Item className='col-span-1' label='Giá' help={errors.price?.message}>
                                    <Input type='number' className='w-full' placeholder='Nhập giá' {...field} />
                                </Form.Item>
                            )}
                        />

                        <Controller
                            name='discount'
                            control={control}
                            render={({ field }) => (
                                <Form.Item label='Giảm giá (%)' help={errors.discount?.message}>
                                    <Input
                                        type='number'
                                        className='w-full'
                                        placeholder='Nhập phần trăm giảm giá'
                                        {...field}
                                    />
                                </Form.Item>
                            )}
                        />

                        <Controller
                            name='status'
                            control={control}
                            render={({ field }) => (
                                <Form.Item className='col-span-1' label='Trạng thái' help={errors.status?.message}>
                                    <Select
                                        options={options}
                                        value={field.value}
                                        onChange={field.onChange}
                                        placeholder='Chọn trạng thái'
                                    ></Select>
                                </Form.Item>
                            )}
                        />

                        <Controller
                            name='duration_days'
                            control={control}
                            render={({ field }) => (
                                <Form.Item
                                    className='col-span-1'
                                    label='Thời gian (ngày)'
                                    help={errors.duration_days?.message}
                                >
                                    <Input type='number' className='w-full' placeholder='Nhập thời gian' {...field} />
                                </Form.Item>
                            )}
                        />

                        <Controller
                            control={control}
                            name='transportation'
                            render={({ field }) => (
                                <Form.Item
                                    className='col-span-1'
                                    label='Phương tiện'
                                    help={errors.transportation?.message}
                                >
                                    <Select
                                        options={optionsTransportation}
                                        value={field.value}
                                        onChange={field.onChange}
                                        placeholder='Chọn phương tiện'
                                    ></Select>
                                </Form.Item>
                            )}
                        />

                        <Controller
                            name='category_id'
                            control={control}
                            render={({ field }) => (
                                <Form.Item label='Danh mục' help={errors.category_id?.message}>
                                    <Select
                                        options={optionsCategory}
                                        value={field.value}
                                        onChange={field.onChange}
                                        placeholder='Chọn danh mục'
                                        allowClear
                                        showSearch
                                        filterOption={(input, option) =>
                                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                        }
                                    ></Select>
                                </Form.Item>
                            )}
                        />

                        <Controller
                            name='code'
                            control={control}
                            render={({ field }) => (
                                <Form.Item label='Mã tour' help={errors.code?.message}>
                                    <Input type='text' className='w-full' placeholder='Nhập mã tour' {...field} />
                                </Form.Item>
                            )}
                        />

                        <Controller
                            name='is_featured'
                            control={control}
                            render={({ field }) => (
                                <Form.Item label='Tour nổi bật' help={errors.is_featured?.message}>
                                    <Switch {...field} />
                                </Form.Item>
                            )}
                        />
                    </div>

                    <div className='grid grid-cols-2 gap-4'>
                        <Controller
                            name='information'
                            control={control}
                            render={({ field }) => (
                                <Form.Item className='col-span-1' label='Thông tin' help={errors.information?.message}>
                                    <TextArea rows={10} placeholder='Nhập thông tin chi tiết' {...field} />
                                </Form.Item>
                            )}
                        />

                        <Controller
                            name='schedule'
                            control={control}
                            render={({ field }) => (
                                <Form.Item className='col-span-1' label='Lịch trình' help={errors.schedule?.message}>
                                    <TextArea rows={10} placeholder='Nhập lịch trình chi tiết' {...field} />
                                </Form.Item>
                            )}
                        />
                        <Controller
                            name='images'
                            control={control}
                            render={({ field }) => (
                                <Form.Item className='col-span-2' label='Hình ảnh' help={errors.images?.message}>
                                    <Dragger {...props}>
                                        <p className='ant-upload-drag-icon'>
                                            <InboxOutlined />
                                        </p>
                                        <p className='ant-upload-text'>Click hoặc kéo thả file vào đây để tải lên</p>
                                        <p className='ant-upload-hint'>Hỗ trợ tải lên tối đa 5 hình ảnh.</p>
                                    </Dragger>
                                </Form.Item>
                            )}
                        />
                    </div>
                </Form>
            </div>
        </Spin>
    );
};
