import { Initial } from "../../atoms/initial/Initial";
import { CardProps } from "./Card.types";

export const Card = ({ initial, name, email, status, dob, onEdit, onDelete}: CardProps) => {
    return (
        <div className="card-container group">
            <Initial text={initial} />
            <h1 className="card-name">{name}</h1>
            <p className="card-info">Email: {email}</p>
            <p className="card-info">Status: {status}</p>
            <p className="card-info">Date of Birth: {dob}</p>
            <div className="buttons-container">
                <button className="edit-btn" onClick={onEdit} >Edit</button>
                <button className="delete-btn" onClick={onDelete}>Delete</button>
            </div>
        </div>
    );
};
