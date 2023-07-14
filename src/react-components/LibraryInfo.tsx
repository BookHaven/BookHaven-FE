import { useAppSelector } from '../redux/store';

interface Library {
    id: number;
    type: string;
    attributes: {
        name: string;
        address: {
            street: string;
            city: string;
            state: string;
            zip: number;
        };
    };
}

interface Props {
    id: number;
}

export const LibraryInfo: React.FC<Props> = ({ id }) => {
    const libraryIndex = useAppSelector((state) => state.libraryIndex);
    const library: Library | undefined = libraryIndex.libraries.find((library) => library.id === id);

    if (!library) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className="library-info">
                <h1>{library.attributes.name}</h1>
                <p>{library.attributes.address.street}</p>
                <p>{library.attributes.address.city}, {library.attributes.address.state} {library.attributes.address.zip}</p>
            </div>
        );
    }
};