const Form = () => {
    return (
        <form className="form">
            <h2>Send a donation</h2>
            <label htmlFor="name">Your name</label>
            <input
                id="name"
                name="name"
                type="text"
            />
            <label htmlFor="email">Your email</label>
            <input
                id="email"
                name="email"
                type="email"
            />
            <label htmlFor="amount">Amount</label>
            <input
                id="amount"
                name="amount"
                type="number"
            />
            <label htmlFor="currency">Currency</label>
            <select
                id="currency"
                name="currency">
                    <option value="">Select currency</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="PLN">PLN</option>
            </select>
            <label htmlFor="text">Your message</label>
            <textarea 
                id="text"
                name="text"
            />
            <label className="checkbox">
                <input name="terms" type="checkbox" />
                You agree with privacy policy?
            </label>
            <button type="submit">Send</button>
        </form>
    )
}

export default Form;