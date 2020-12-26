import React, { useContext, useState } from 'react';
import { SocketContext } from '../context/SocketContext';

const BandAdd = () => {
    const [value, setValue] = useState('');
    const { socket } = useContext(SocketContext);

    const handleSubmit = event => {
        event.preventDefault();

        if (value.trim().length > 0) {
            socket.emit('add-band', { name: value });
            setValue('');
        }
    }

    return (
        <>
            <h3>Agregar Banda</h3>
            <form onSubmit={handleSubmit}>
                <input
                    className="form-control"
                    placeholder="Nuevo nombre de banda"
                    value={value}
                    onChange={event => setValue(event.target.value)}
                />
            </form>
        </>
    );
}

export default BandAdd;