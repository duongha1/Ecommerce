import React from 'react';

export default function ContentHeader(props) { 
    return (
        <>{/*React fragment*/}
            <div className="content-header color">
                <h3>Products</h3>
                <button className="btn primary-btn" onClick={props.toggleModal}>+ Add</button>
            </div>
            
        </>
    )
    
}