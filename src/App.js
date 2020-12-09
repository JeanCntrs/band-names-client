import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import BandAdd from './components/BandAdd';
import BandList from './components/BandList';

const connectSocketServer = () => {
    const socket = io.connect('http://localhost:8080', {
        transports: ['websocket']
    });

    return socket;
}

const App = () => {
    const [socket] = useState(connectSocketServer());
    const [online, setOnline] = useState();
    const [bands, setBands] = useState([]);

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
        setOnline(socket.connected);
    }, [socket])

    useEffect(() => {
        socket.on('connect', () => {
            setOnline(true);
        });
    }, [socket]);

    useEffect(() => {
        socket.on('disconnect', () => {
            setOnline(false);
        });
    }, [socket]);

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