function TransactionTypeSelectWrapper({transactionTypes, setTransactionType, activeTransactionType}) {
    return (
        <div className='type-select form'>
            {transactionTypes.map((type) => {
                return (
                    <div 
                        key={type.id} 
                        className={activeTransactionType==type.id ? 'active' : ''} 
                        onClick={()=> setTransactionType(type.id)}
                    >
                        {type.name}
                    </div>
                )
            })}
        </div>
    )
}

export default TransactionTypeSelectWrapper;