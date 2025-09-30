import { useFormik } from 'formik';
import * as Yup from 'yup';

const Form = () => {
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            amount: 0,
            currency: '',
            text: '',
            terms: false
        },
        validationSchema: Yup.object({
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
        }),
        onSubmit: values => console.log(JSON.stringify(values, null, 2))
    });

    const getErrorMessageElement = (fieldName) => {
        return formik.touched[fieldName] && formik.errors[fieldName] 
            ? <div className='error'>{formik.errors[fieldName]}</div> 
            : null;
    }

    return (
        <form className="form" onSubmit={formik.handleSubmit}>
            <h2>Send a donation</h2>
            <label htmlFor="name">Your name</label>
            <input
                id="name"
                name="name"
                type="text"
                {...formik.getFieldProps('name')}
            />
            { getErrorMessageElement('name') }
            <label htmlFor="email">Your email</label>
            <input
                id="email"
                name="email"
                type="email"
                {...formik.getFieldProps('email')}
            />
            { getErrorMessageElement('email') }
            <label htmlFor="amount">Amount</label>
            <input
                id="amount"
                name="amount"
                type="number"
                {...formik.getFieldProps('amount')}
            />
            { getErrorMessageElement('amount') }
            <label htmlFor="currency">Currency</label>
            <select
                id="currency"
                name="currency"
                {...formik.getFieldProps('currency')}>
                    <option value="">Select currency</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="PLN">PLN</option>
            </select>
            { getErrorMessageElement('currency') }
            <label htmlFor="text">Your message</label>
            <textarea 
                id="text"
                name="text"
                {...formik.getFieldProps('text')}
            />
            { getErrorMessageElement('text') }
            <label className="checkbox">
                <input 
                    name="terms" 
                    type="checkbox" 
                    {...formik.getFieldProps('terms')}/>
                You agree with privacy policy?
            </label>
            { getErrorMessageElement('terms') }
            <button type="submit">Send</button>
        </form>
    )
}

export default Form;