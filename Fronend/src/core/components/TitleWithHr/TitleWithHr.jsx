import TitleStyle from './TitleWithHr.module.css'

function TitleWithHr(props) {
    return (
        <div className={TitleStyle.middleTitle}>
            <hr />
            <h5 className={TitleStyle.chooseText} style={{ fontSize: props.fontSize }}>
                {props.title}
            </h5>
            <hr />
        </div>
    )
}

export default TitleWithHr;
