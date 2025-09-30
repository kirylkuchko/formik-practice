import { useFormik } from "formik";

const validate = values => {
    const errors = {};

    if (!values.name) {
        errors.name = 'Required'
    } else if (values.name.length < 2) {
        errors.name = 'Minimum 2 symbols'
    }

    if (!values.email) {
        errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }

    return errors;
}

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
        validate,
        onSubmit: values => console.log(JSON.stringify(values, null, 2))
    });

    return (
        <form className="form" onSubmit={formik.handleSubmit}>
            <h2>Send a donation</h2>
            <label htmlFor="name">Your name</label>
            <input
                id="name"
                name="name"
                type="text"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            { formik.touched.name && formik.errors.name ? formik.errors.name : null }
            <label htmlFor="email">Your email</label>
            <input
                id="email"
                name="email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            { formik.touched.email && formik.errors.email ? formik.errors.email : null}
            <label htmlFor="amount">Amount</label>
            <input
                id="amount"
                name="amount"
                type="number"
                value={formik.values.amount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            <label htmlFor="currency">Currency</label>
            <select
                id="currency"
                name="currency"
                value={formik.values.currency}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}>
                    <option value="">Select currency</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="PLN">PLN</option>
            </select>
            <label htmlFor="text">Your message</label>
            <textarea 
                id="text"
                name="text"
                value={formik.values.text}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            <label className="checkbox">
                <input 
                    name="terms" 
                    type="checkbox" 
                    value={formik.values.terms} 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}/>
                You agree with privacy policy?
            </label>
            <button type="submit">Send</button>
        </form>
    )
}

export default Form;