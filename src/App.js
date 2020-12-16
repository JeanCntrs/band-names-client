import React, { useState, useEffect } from 'react';
import BandAdd from './components/BandAdd';
import BandList from './components/BandList';
import { useSocket } from './hooks/useSocket';

const App = () => {
    const [bands, setBands] = useState([]);
    const { socket, online } = useSocket('http://localhost:8080');

    const handleIncreaseVotes = id => {
        socket.emit('increase-votes', id);
    }

    const handleRemoveBand = id => {
        socket.emit('remove-band', id);
    }

    const handleChangeName = (id, newName) => {
        socket.emit('change-name', { id, newName });
    }

    const handleAddBand = name => {
        socket.emit('add-band', { name });
    }

    useEffect(() => {
        socket.on('current-bands', bands => {
            setBands(bands);
        });
    }, [socket]);

    return (
        <div className="container">
            <div className="alert">
                <p>
                    Service status:
                    {
                        online
                            ? <span className="text-success"> Online</span>
                            : <span className="text-danger"> Offline</span>
                    }
                </p>
            </div>
            <h1>Band Names</h1>
            <hr />
            <div className="row">
                <div className="col-8">
                    <BandList
                        data={bands}
                        handleRemoveBand={handleRemoveBand}
                        handleChangeName={handleChangeName}
                        handleIncreaseVotes={handleIncreaseVotes}
                    />
                </div>
                <div className="col-4">
                    <BandAdd handleAddBand={handleAddBand} />
                </div>
            </div>
        </div>
    );
}

export default App;