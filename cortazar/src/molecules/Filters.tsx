import { Filter } from '../atoms/Filter'

export const Filters = () => <div className='columns'>
    <div className='column'>
        <Filter 
            name={'Topics'}
            isActive={false}
            setActive={() => {}}
            filters={[]}
            select={() => {}}
        />
    </div>

    <div className='column'>
        <Filter 
            name={'Tags'}
            isActive={false}
            setActive={() => {}}
            filters={[]}
            select={() => {}}
        />
    </div>

    <div className='column'>
        <Filter 
            name={'Rating'}
            isActive={false}
            setActive={() => {}}
            filters={[]}
            select={() => {}}
        />
    </div>

    <div className='column'>
        <Filter 
            name={'Reading Time'}
            isActive={false}
            setActive={() => {}}
            filters={[]}
            select={() => {}}
        />
    </div>

    <div className='column'>
        <Filter 
            name={'Sort'}
            isActive={false}
            setActive={() => {}}
            filters={[]}
            select={() => {}}
        />
    </div>
</div>
