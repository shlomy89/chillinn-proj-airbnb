import React, { useState } from 'react'
import Rating from '@mui/material/Rating'
import { useDispatch, useSelector } from 'react-redux'
import StarIcon from '@mui/icons-material/Star'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import SendIcon from '@mui/icons-material/Send'

import { createTheme, ThemeProvider } from '@mui/material/styles'
import { addReview } from '../../store/actions/review.actions'

export function AddReview({ stay, set }) {
    const dispatch = useDispatch()

    const [reviewText, setReviewText] = useState('')
    const [rating, setRating] = useState([5, 5, 5, 5, 5, 5])
    const types = [
        'Cleanliness:',
        'Communication:',
        'Check-in:',
        'Accuracy:',
        'Location:',
        'Value:'
    ]

    const handleChange = (event) => {
        setReviewText(event.target.value)
    }

    async function onAddReview() {
        dispatch(
            addReview({
                text: reviewText,
                rating: {
                    cleanliness: rating[0],
                    communication: rating[1],
                    checkin: rating[2],
                    accuracy: rating[3],
                    location: rating[4],
                    value: rating[5]
                },
                stayId: stay._id
            })
        )
        setReviewText('')
        setRating([5, 5, 5, 5, 5, 5])
    }

    const theme = createTheme({
        palette: {
            primary: {
                main: '#FF385C'
            },
            secondary: {
                main: '#FF385C'
            }
        }
    })

    const btnTheme = createTheme({
        palette: {
            primary: {
                main: '#222222'
            },
            secondary: {
                main: '#222222'
            }
        }
    })

    return (
        <div>
            <div className='rating-bars-container'>
                {types.map((type, idx) =>
                    RatingBar(type, idx, rating, setRating)
                )}
            </div>
            <div className='type-area'>
                <ThemeProvider theme={theme}>
                    <TextField
                        fullWidth
                        label='Share your exprience with this stay'
                        color='secondary'
                        multiline
                        rows={3}
                        value={reviewText}
                        onChange={handleChange}
                    />
                </ThemeProvider>
            </div>
            <div className='add-review-btn'>
                <ThemeProvider theme={btnTheme}>
                    <Button
                        onClick={onAddReview}
                        variant='outlined'
                        endIcon={<SendIcon />}
                    >
                        Add Review
                    </Button>
                </ThemeProvider>
            </div>
        </div>
    )
}

function RatingBar(type, idx, value, setValue) {
    // const [value, setValue] = React.useState(5);
    const [hover, setHover] = useState(-1)

    function setnewValue() {
        value[idx] = hover
        setValue([...value])
        console.log(value)
    }

    return (
        <div className='bar-container'>
            <span className='rating-bar-header'>{type}</span>
            <Rating
                name='hover-feedback'
                value={value[idx]}
                precision={0.5}
                onChange={() => {
                    setnewValue()
                }}
                onChangeActive={(event, newHover) => {
                    setHover(newHover)
                }}
                emptyIcon={
                    <StarIcon style={{ opacity: 0.55 }} fontSize='inherit' />
                }
            />
        </div>
    )
}
