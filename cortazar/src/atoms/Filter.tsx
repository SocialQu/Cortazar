/* eslint-disable jsx-a11y/anchor-is-valid */


const path = 'M0 0 L5 6 L10 0'
const pathStyle = {stroke:'#363636', fill:'transparent', strokeWidth:2 }

interface iFilter { name:string, isActive:boolean, setActive():void, filters:string[], select(filter:string):void }
export const Filter = ({name, isActive, setActive, filters, select}: iFilter) => <div className={`dropdown ${isActive ? 'is-active' : ''}`}>
    <div className='dropdown-trigger'>
        <button className='button' aria-haspopup='true' aria-controls='dropdown-menu' onClick={setActive} style={{width:180}}>
            <span> { name } </span>
            <svg style={{height:24, marginLeft:'auto', width:10, paddingTop:9}}>
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
