'use client';

import React from 'react';

// next

// material-ui
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import AnimateButton from 'components/@extended/AnimateButton';

import axios from 'utils/axios';

export default function SendBook({
  onSuccess,
  onError
}: {
  onSuccess: () => void;
  onError: (msg: string) => void;
}) {
  return (
    <>
      <Formik
        initialValues={{
          ISBN: '',
          title: '',
          author: '',
          publicationYear: '',
          totalRatings: '0',
          oneStar: '0',
          twoStar: '0',
          threeStar: '0',
          fourStar: '0',
          fiveStar: '0',
          imageSmallURL: '',
          imageLargeURL: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          title: Yup.string().max(255).required('Book name is required'),
          ISBN: Yup.string().matches(/^[0-9]+$/, "Must be only digits").max(13, 'Must be 13 digits').min(13, 'Must be 13 digits').required("ISBN is required"),
          publicationYear: Yup.string().matches(/^[0-9]+$/, "Must be only digits").max(4, 'Must be under 5 digits').required("Year is required"),
          totalRatings: Yup.number().nullable().typeError("Must be a number").moreThan(-1, "Cannot be negative"),
          oneStar: Yup.number().nullable().typeError("Must be a number").moreThan(-1, "Cannot be negative"),
          twoStar: Yup.number().nullable().typeError("Must be a number").moreThan(-1, "Cannot be negative"),
          threeStar: Yup.number().nullable().typeError("Must be a number").moreThan(-1, "Cannot be negative"),
          fourStar: Yup.number().nullable().typeError("Must be a number").moreThan(-1, "Cannot be negative"),
          fiveStar: Yup.number().nullable().typeError("Must be a number").moreThan(-1, "Cannot be negative"),
          imageSmallURL: Yup.string().max(16).required('Small Image URL is required'),
          imageLargeURL: Yup.string().max(16).required('Large Image URL is required'),
          author: Yup.string().max(255).required('Author is required')

        })}
        onSubmit={(values, { setErrors, setSubmitting, setValues, resetForm }) => {
          console.dir(values);

          axios
            .post('/library/add', { ISBN: values.ISBN, author: values.author, publicationYear: values.publicationYear, title: values.title, totalRatings: values.totalRatings, oneStar: values.oneStar, twoStar: values.twoStar, threeStar: values.threeStar, fourStar: values.fourStar, fiveStar: values.fiveStar, imageSmallURL: values.imageSmallURL, imageLargeURL: values.imageLargeURL})
            .then((response) => {
              setSubmitting(false);
              resetForm({
                values: {
                    ISBN: '',
                    title: '',
                    author: '',
                    publicationYear: '',
                    totalRatings: '0',
                    oneStar: '0',
                    twoStar: '0',
                    threeStar: '0',
                    fourStar: '0',
                    fiveStar: '0',
                    imageSmallURL: '',
                    imageLargeURL: '',
                    submit: null
                }
              });
              onSuccess();
            })
            .catch((error) => {
              console.error(error);
              setErrors({ title: error.message });
              setSubmitting(false);
              onError(error.message);
            });
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={0}>
              <Grid item xs={12}>
                <Stack spacing={0}>
                  <InputLabel htmlFor="title">Title</InputLabel>
                  <OutlinedInput
                    id="book-name"
                    type="text"
                    value={values.title}
                    name="title"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter book title"
                    fullWidth
                    error={Boolean(touched.title && errors.title)}
                  />
                </Stack>
                {touched.title && errors.title && (
                  <FormHelperText error id="standard-weight-helper-text-name-message-send">
                    {errors.title}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={0}>
                  <InputLabel htmlFor="author">Author</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.author && errors.author)}
                    id="author"
                    type="text"
                    value={values.author}
                    name="author"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter author name"
                  />
                </Stack>
                {touched.author && errors.author && (
                  <FormHelperText error id="standard-weight-helper-text-msg-message-send">
                    {errors.author}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={0}>
                  <InputLabel htmlFor="ISBN">ISBN</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.ISBN && errors.ISBN)}
                    id="ISBN"
                    type="number"
                    value={values.ISBN}
                    name="ISBN"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter ISBN"
                  />
                </Stack>
                {touched.ISBN && errors.ISBN && (
                  <FormHelperText error id="standard-weight-helper-text-msg-message-send">
                    {errors.ISBN}
                  </FormHelperText>
                )}
               </Grid>
              <Grid item xs={12}>
                <Stack spacing={0}>
                  <InputLabel htmlFor="publicationYear">Publication Year</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.publicationYear && errors.publicationYear)}
                    id="publicationYear"
                    type="number"
                    value={values.publicationYear}
                    name="publicationYear"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter publication Year"
                  />
                </Stack>
                {touched.imageLargeURL && errors.imageLargeURL && (
                  <FormHelperText error id="standard-weight-helper-text-msg-message-send">
                    {errors.publicationYear}
                  </FormHelperText>
                )}
             </Grid>
              <Grid item xs={12}>
                <Stack spacing={0}>
                  <InputLabel htmlFor="imageLargeURL">Large Image URL</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.imageLargeURL && errors.imageLargeURL)}
                    id="imageLargeURL"
                    type="string"
                    value={values.imageLargeURL}
                    name="imageLargeURL"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter large image URL"
                  />
                </Stack>
                {touched.imageLargeURL && errors.imageLargeURL && (
                  <FormHelperText error id="standard-weight-helper-text-msg-message-send">
                    {errors.imageLargeURL}
                  </FormHelperText>
                )}

            </Grid>
              <Grid item xs={12}>
                <Stack spacing={0}>
                  <InputLabel htmlFor="imageSmallURL">Small Image URL</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.imageSmallURL && errors.imageSmallURL)}
                    id="imageSmallURL"
                    type="string"
                    value={values.imageSmallURL}
                    name="imageSmallURL"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter small image URL"
                  />
                </Stack>
                {touched.imageSmallURL && errors.imageSmallURL && (
                  <FormHelperText error id="standard-weight-helper-text-msg-message-send">
                    {errors.imageSmallURL}
                  </FormHelperText>
                )}


                </Grid>
              <Grid item xs={12}>
                <Stack spacing={0}>
                  <InputLabel htmlFor="totalRatings">Total Ratings (Optional)</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.totalRatings && errors.totalRatings)}
                    id="totalRatings"
                    type="number"
                    value={values.totalRatings}
                    name="totalRatings"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter total ratings"
                  />
                </Stack>
                {touched.totalRatings && errors.totalRatings && (
                  <FormHelperText error id="standard-weight-helper-text-msg-message-send">
                    {errors.totalRatings}
                  </FormHelperText>
                )}

                </Grid>
              <Grid item xs={12}>
                <Stack spacing={0}>
                  <InputLabel htmlFor="oneStar">One Star Ratings (Optional)</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.oneStar && errors.oneStar)}
                    id="oneStar"
                    type="number"
                    value={values.oneStar}
                    name="oneStar"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter one star ratings"
                  />
                </Stack>
                {touched.oneStar && errors.oneStar && (
                  <FormHelperText error id="standard-weight-helper-text-msg-message-send">
                    {errors.oneStar}
                  </FormHelperText>
                )}

            </Grid>
              <Grid item xs={12}>
                <Stack spacing={0}>
                  <InputLabel htmlFor="twoStar">Two Star Ratings (Optional)</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.twoStar && errors.twoStar)}
                    id="twoStar"
                    type="number"
                    value={values.twoStar}
                    name="twoStar"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter two star ratings"
                  />
                </Stack>
                {touched.twoStar && errors.twoStar && (
                  <FormHelperText error id="standard-weight-helper-text-msg-message-send">
                    {errors.twoStar}
                  </FormHelperText>
                )}
                
            </Grid>
              <Grid item xs={12}>
                <Stack spacing={0}>
                  <InputLabel htmlFor="threeStar">Three Star Ratings (Optional)</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.threeStar && errors.threeStar)}
                    id="threeStar"
                    type="number"
                    value={values.threeStar}
                    name="threeStar"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter three star ratings"
                  />
                </Stack>
                {touched.threeStar && errors.threeStar && (
                  <FormHelperText error id="standard-weight-helper-text-msg-message-send">
                    {errors.threeStar}
                  </FormHelperText>
                )}

            </Grid>
              <Grid item xs={12}>
                <Stack spacing={0}>
                  <InputLabel htmlFor="fourStar">Four Star Ratings (Optional)</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.fourStar && errors.fourStar)}
                    id="fourStar"
                    type="number"
                    value={values.fourStar}
                    name="fourStar"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter four star ratings"
                  />
                </Stack>
                {touched.fourStar && errors.fourStar && (
                  <FormHelperText error id="standard-weight-helper-text-msg-message-send">
                    {errors.fourStar}
                  </FormHelperText>
                )}

              </Grid>
              <Grid item xs={12}>
                <Stack spacing={0}>
                  <InputLabel htmlFor="fiveStar">Five Star Ratings (Optional)</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.fiveStar && errors.fiveStar)}
                    id="fiveStar"
                    type="number"
                    value={values.fiveStar}
                    name="fiveStar"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter five star ratings"
                  />
                </Stack>
                {touched.fiveStar && errors.fiveStar && (
                  <FormHelperText error id="standard-weight-helper-text-msg-message-send">
                    {errors.fiveStar}
                  </FormHelperText>
                )}
                
              </Grid>
              

              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                    SEND!
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
}
