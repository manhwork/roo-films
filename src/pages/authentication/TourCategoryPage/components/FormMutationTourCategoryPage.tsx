import { InboxOutlined, PlusOutlined } from '@ant-design/icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { Breadcrumb, Button, Form, FormInstance, Input, message, Select, Spin, Upload, UploadProps } from 'antd';
import { useEffect, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { RouteConfig } from '../../../../constants';
import { useShowNotification } from '../../../../components/Notification/Notification';
import { useCreateTourCategory, useTourCategory, useUpdateTourCategory } from '../hooks/useTourQueries';
import { getMutationTourCategory, TourCategorySchema } from '../schema/FormTourPageSchema';

interface FormMutationTourCategoryPageProps {
    _id?: string;
}

export const FormMutationTourCategoryPage = ({ _id }: FormMutationTourCategoryPageProps) => {
    const navigate = useNavigate();
    const showNotification = useShowNotification();
    const antdFormRef = useRef<FormInstance>(null);
    const createTourCategoryMutation = useCreateTourCategory();
    const updateTourCategoryMutation = useUpdateTourCategory();
    const { data, isLoading } = useTourCategory({ id: _id || '' });
    const initialData = data?.data;

    const {
        control,
        handleSubmit: formSubmit,
        formState: { errors },
        reset
    } = useForm<TourCategorySchema>({
        resolver: zodResolver(getMutationTourCategory),
        defaultValues: {
            status: 'active',
            position: 0
        }
    });

    useEffect(() => {
        if (initialData) {
            reset({
                title: initialData?.title,
                image: initialData?.image,
                description: initialData?.description,
                status: initialData?.status,
                position: initialData?.position
            });
        }
    }, [initialData, reset]);

    const handleFormSubmit = (data: TourCategorySchema) => {
        if (_id) {
            updateTourCategoryMutation.mutate(
                { ...data, id: _id },
                {
                    onSuccess: () => {
                        showNotification('success', 'Cập nhật thành công', 'Danh mục tour đã được cập nhật thành công');
                        navigate(-1);
                    },
                    onError: () => {
                        showNotification(
                            'error',
                            'Cập nhật thất bại',
                            'Không thể cập nhật danh mục tour. Vui lòng thử lại sau.'
                        );
                    }
                }
            );
        } else {
            createTourCategoryMutation.mutate(data, {
                onSuccess: () => {
                    showNotification('success', 'Tạo mới thành công', 'Danh mục tour đã được tạo thành công');
                    navigate(-1);
                },
                onError: () => {
                    showNotification(
                        'error',
                        'Tạo mới thất bại',
                        'Không thể tạo danh mục tour mới. Vui lòng thử lại sau.'
                    );
                }
            });
        }
    };

    const options = [
        { value: 'active', label: <span>Hoạt động</span> },
        { value: 'inactive', label: <span>Dừng hoạt động</span> },
        { value: 'pending', label: <span>Chờ duyệt</span> }
    ];
    const { Dragger } = Upload;

    const props: UploadProps = {
        name: 'file',
        multiple: false,
        maxCount: 1,
        action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                showNotification('success', 'Tải lên thành công', `${info.file.name} đã được tải lên thành công`);
            } else if (status === 'error') {
                showNotification('error', 'Tải lên thất bại', `${info.file.name} tải lên thất bại`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
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
                                title: 'Quản lý danh mục tour',
                                onClick: () => navigate(RouteConfig.ListTourCategoryPage.path),
                                className: 'cursor-pointer'
                            },
                            {
                                title: _id ? 'Cập nhật danh mục tour' : 'Tạo mới danh mục tour'
                            }
                        ]}
                    />

                    <div className='flex gap-2'>
                        <Button onClick={() => navigate(RouteConfig.ListTourCategoryPage.path)}>Hủy</Button>
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
                <Form className='grid grid-cols-1 gap-2' layout='vertical' ref={antdFormRef}>
                    <div className='grid grid-cols-2 gap-4'>
                        <Controller
                            name='title'
                            control={control}
                            render={({ field }) => (
                                <Form.Item label='Tên danh mục' help={errors.title?.message}>
                                    <Input placeholder='Nhập tên danh mục' type='text' {...field} />
                                </Form.Item>
                            )}
                        />

                        <Controller
                            name='status'
                            control={control}
                            render={({ field }) => (
                                <Form.Item label='Trạng thái' help={errors.status?.message}>
                                    <Select options={options} value={field.value} onChange={field.onChange}></Select>
                                </Form.Item>
                            )}
                        />
                    </div>

                    <Controller
                        name='description'
                        control={control}
                        render={({ field }) => (
                            <Form.Item label='Mô tả' help={errors.description?.message}>
                                <Input.TextArea placeholder='Nhập mô tả' rows={10} {...field} />
                            </Form.Item>
                        )}
                    />

                    {/* <Controller
                        name='image'
                        control={control}
                        render={({ field }) => (
                            <Form.Item label='Hình ảnh' help={errors.image?.message}>
                                <Dragger {...props} {...field}>
                                    <p className='ant-upload-drag-icon'>
                                        <InboxOutlined />
                                    </p>
                                    <p className='ant-upload-text'>Click hoặc kéo thả file vào đây để tải lên</p>
                                    <p className='ant-upload-hint'>Chỉ hỗ trợ tải lên 1 hình ảnh.</p>
                                </Dragger>
                            </Form.Item>
                        )}
                    /> */}
                </Form>
            </div>
        </Spin>
    );
};
