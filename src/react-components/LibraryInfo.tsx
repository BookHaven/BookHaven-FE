import { useAppSelector, useAppDispatch } from '../redux/store';
import { fetchLibraries } from '../redux/libraryIndex';
import { useEffect } from 'react';

interface Library {
    id: number;
    type: string;
    attributes: {
        name: string;
        address: {
            street: string;
            city: string;
            state: string;
            zip: string;
        }
        location: {
            lat: number;
            lon: number;
        },
        book_count: number;
    };
}

interface LibraryInfoProp {
    currentLibraryId: number;
}

export const LibraryInfo = ({ currentLibraryId }: LibraryInfoProp) => {
    const libraryIndex = useAppSelector((state) => state.libraryIndex);
    const library = libraryIndex.libraries.find((library) => library.id === currentLibraryId);
    const dispatch = useAppDispatch();
  
    useEffect(() => {
        dispatch(fetchLibraries())
    }, [])

    if (!library) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className="library-info">
                <h1>{library.attributes.name}</h1>
                <p className="street">{library.attributes.address.street}</p>
                <p className="city-state-zip">{library.attributes.address.city}, {library.attributes.address.state} {library.attributes.address.zip}</p>
            </div>
        );
    };
};