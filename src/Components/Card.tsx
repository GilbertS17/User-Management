type Props = {
    initial: string,
    name: string,
    email: string,
    status: string,
    dob: string
}

export const Card = ({ initial, name, email, status, dob }: Props) => {
    return (
        <div className="card-container group">
            <div className="initial-container">
                <h1 className="card-initial">{ initial }</h1>
            </div>
            <h1 className="card-name">{ name }</h1>
            <p className="card-info">Email: { email }</p>
            <p className="card-info">Status: { status }</p>
            <p className="card-info">Date of Birth: { dob }</p>
            <div className="buttons-container">
                <button className="edit-btn">Edit</button>
                <button className="delete-btn">Delete</button>
            </div>
        </div>
    );
}