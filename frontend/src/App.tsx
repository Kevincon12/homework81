import './App.css'
import {useState} from "react";
import axios from "axios";
import {Box, Button, Container, Link, TextField, Typography} from "@mui/material";

const App = () => {
    const [url, setUrl] = useState('');
    const [shortLink, setShortLink] = useState('');

    const handleShorten = async () => {
        if (!url) return;

        try {
            const response = await axios.post("http://localhost:8000/links", { url });
            setShortLink(`http://localhost:8000/links/${response.data.shortUrl}`);
        } catch (error) {
            console.error("Error shortening link:", error);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 5, textAlign: "center" }}>
            <Typography variant="h4" gutterBottom>
                Shorten your link
            </Typography>

            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                <TextField
                    label="Enter URL"
                    variant="outlined"
                    fullWidth
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />
                <Button variant="contained" onClick={handleShorten}>
                    Shorten
                </Button>
            </Box>

            {shortLink && (
                <Box sx={{ mt: 3 }}>
                    <Typography variant="subtitle1">Your link now looks like this:</Typography>
                    <Link href={shortLink} target="_blank" rel="noopener">
                        {shortLink}
                    </Link>
                </Box>
            )}
        </Container>
    );
};

export default App
