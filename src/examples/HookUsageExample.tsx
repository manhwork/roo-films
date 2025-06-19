import React from 'react';
import { useFetchData, usePostData, usePatchData, useDeleteData } from '../hooks/useFetchData';
import { Actor } from '../models/Actor';

// Ví dụ sử dụng useFetchData (GET)
export function ActorListExample() {
    const { data, loading, error, refetch } = useFetchData<Actor[]>('/actors');

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <button onClick={refetch}>Refresh</button>
            {data?.map((actor) => <div key={actor._id}>{actor.name}</div>)}
        </div>
    );
}

// Ví dụ sử dụng usePostData
export function CreateActorExample() {
    const { postData, loading, error } = usePostData<Actor>('/actors');

    const handleCreate = async () => {
        try {
            const newActor = {
                name: 'New Actor',
                bio: 'Actor bio',
                nationality: 'Vietnam'
            };
            const result = await postData(newActor);
            console.log('Created:', result);
        } catch (err) {
            console.error('Error creating actor:', err);
        }
    };

    return (
        <div>
            <button onClick={handleCreate} disabled={loading}>
                {loading ? 'Creating...' : 'Create Actor'}
            </button>
            {error && <div>Error: {error.message}</div>}
        </div>
    );
}

// Ví dụ sử dụng usePatchData
export function UpdateActorExample() {
    const { patchData, loading, error } = usePatchData<Actor>('/actors/123');

    const handleUpdate = async () => {
        try {
            const updateData = {
                name: 'Updated Actor Name',
                bio: 'Updated bio'
            };
            const result = await patchData(updateData);
            console.log('Updated:', result);
        } catch (err) {
            console.error('Error updating actor:', err);
        }
    };

    return (
        <div>
            <button onClick={handleUpdate} disabled={loading}>
                {loading ? 'Updating...' : 'Update Actor'}
            </button>
            {error && <div>Error: {error.message}</div>}
        </div>
    );
}

// Ví dụ sử dụng useDeleteData
export function DeleteActorExample() {
    const { deleteData, loading, error } = useDeleteData('/actors/123');

    const handleDelete = async () => {
        try {
            const result = await deleteData();
            console.log('Deleted:', result);
        } catch (err) {
            console.error('Error deleting actor:', err);
        }
    };

    return (
        <div>
            <button onClick={handleDelete} disabled={loading}>
                {loading ? 'Deleting...' : 'Delete Actor'}
            </button>
            {error && <div>Error: {error.message}</div>}
        </div>
    );
}

// Ví dụ sử dụng useFetchData với POST
export function SearchActorExample() {
    const { data, loading, error } = useFetchData<Actor[]>('/actors/search', {
        method: 'POST',
        data: { name: 'John' }
    });

    if (loading) return <div>Searching...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return <div>{data?.map((actor) => <div key={actor._id}>{actor.name}</div>)}</div>;
}
