import { Formik, Form, Field, ErrorMessage, useField } from 'formik';
import * as Yup from 'yup';

const MyTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <>
        <label htmlFor={props.name}>{label}</label>
        <input {...field} {...props} />
        { meta.touched && meta.error ?
            <div className="error">{meta.error}</div>
            : null}
      </>
    );
};

const MyCheckbox = ({ children, ...props }) => {
    const [field, meta] = useField({ ...props, type: 'checkbox' });
    return (
      <>
        <label className="checkbox">
            <input type="checkbox" {...field} {...props} />
            {children}
        </label>
        { meta.touched && meta.error ?
            <div className="error">{meta.error}</div>
            : null}
      </>
    );
};

const CustomForm = () => {
    const initialValues = {
        name: '',
        email: '',
        amount: 0,
        currency: '',
        text: '',
        terms: false
    };

    const onSubmit = (values, actions) => {
        console.log(JSON.stringify(values, null, 2));
        actions.resetForm();
    };

    return (
        <Formik
            initialValues = {initialValues}
            validationSchema = {
                Yup.object({
                    name: Yup.string()
                        .min(2, 'Minimum 2 symbols')
                        .required('Required'),
                    email: Yup.string()
                        .email('Invalid email address')
                        .required('Required'),
                    amount: Yup.number()
                        .min(5, 'Minimum 5')
                        .required('Required'),
                    currency: Yup.string()
                        .required('Select currency'),
                    text: Yup.string()
                        .min(10, 'Minimum 10 symbols'),
                    terms: Yup.boolean()
                        .required('Acceptance required').
                        oneOf([true], 'Acceptance required')
            })}
            onSubmit = {onSubmit}
        >
            <Form className="form">
                <h2>Send a donation</h2>
                <MyTextInput
                    label="Your name"
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="off"
                />
                <MyTextInput
                    label="Your email"
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="off"
                />
                <label htmlFor="amount">Amount</label>
                <Field
                    id="amount"
                    name="amount"
                    type="number"
                />
                <ErrorMessage className="error" name="amount" component="div"/>
                <label htmlFor="currency">Currency</label>
                <Field
                    id="currency"
                    name="currency"
                    as="select">
                        <option value="">Select currency</option>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="PLN">PLN</option>
                </Field>
                <ErrorMessage className="error" name="currency" component="div"/>
                <label htmlFor="text">Your message</label>
                <Field 
                    id="text"
                    name="text"
                    as="textarea"
                />
                <ErrorMessage className="error" name="text" component="div"/>
                <MyCheckbox name="terms">
                    You agree with privacy policy?
                </MyCheckbox>
                <button type="submit">Send</button>
            </Form>
        </Formik>
    )
}

export default CustomForm;