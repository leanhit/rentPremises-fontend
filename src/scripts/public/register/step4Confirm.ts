export default {
    props: ['form'],
    setup(props: any) {
        console.log('props', props.form);
        return {
            props,
        };
    },
};
