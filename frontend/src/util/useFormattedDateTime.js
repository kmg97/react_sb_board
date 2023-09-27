import { useState, useEffect } from 'react';

function useFormattedDateTime(createdAt) {
    const [formattedDateTime, setFormattedDateTime] = useState('');

    useEffect(() => {
        const date = new Date(createdAt);
        const formattedDateTime = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
        setFormattedDateTime(formattedDateTime);
    }, [createdAt]);

    return formattedDateTime;
}

export default useFormattedDateTime;