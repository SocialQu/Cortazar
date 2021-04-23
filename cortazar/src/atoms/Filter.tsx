/* eslint-disable jsx-a11y/anchor-is-valid */


const path = 'M0 0 L10 13 L20 0'
const pathStyle = {stroke: '#2994D1', fill: 'transparent', strokeWidth: 1 }

interface iFilter { name:string, isActive:boolean, setActive():void, filters:string[], select(filter:string):void }
export const Filter = ({name, isActive, setActive, filters, select}: iFilter) => <div className={`dropdown ${isActive ? 'is-active' : ''}`}>
    <div className='dropdown-trigger'>
        <button className='button' aria-haspopup='true' aria-controls='dropdown-menu' onClick={setActive}>
            <span> { name } </span>
            <svg className='arrows'>
                <path className='a1' d={path} style={pathStyle}></path>
            </svg>
        </button>
    </div>

    <div className='dropdown-menu' id='dropdown-menu' role='menu'>
        <div className='dropdown-content'>
            {
                filters.map((f, i) => 
                    <a className='dropdown-item' onClick={() => select(f)} key={i}>
                        { f }
                    </a>
                )
            }
        </div>
    </div>
</div>
