import { useI18n } from 'vue-i18n';
import { ref, computed, watch, toRefs } from 'vue';
import { ElMessage } from 'element-plus';

export default {
    props: ['form'],
    setup(props: any, context: any) {
        const { t } = useI18n();

        const { fullName, gender } = toRefs(props.form);

        // Không lấy dob từ toRefs, vì mình sẽ gán trực tiếp vào props.form.dob
        const selectedDay = ref('');
        const selectedMonth = ref('');
        const selectedYear = ref('');

        const getToday = () => {
            const today = new Date();
            return {
                year: today.getFullYear(),
                month: today.getMonth() + 1,
                day: today.getDate()
            };
        };

        const daysInMonth = computed(() => {
            if (!selectedMonth.value || !selectedYear.value) return 31;
            const month = Number(selectedMonth.value);
            const year = Number(selectedYear.value);
            return new Date(year, month, 0).getDate();
        });

        const yearOptions = computed(() => {
            const currentYear = new Date().getFullYear();
            const years = [];
            for (let i = currentYear; i >= 1900; i--) {
                years.push(i);
            }
            return years;
        });

        watch([selectedDay, selectedMonth, selectedYear], () => {
            // Nếu thiếu phần nào, gán mặc định cho phần đó
            const year = selectedYear.value || new Date().getFullYear().toString();
            const month = selectedMonth.value || '01';
            const day = selectedDay.value || '01';

            const monthStr = String(month).padStart(2, '0');
            const dayStr = String(day).padStart(2, '0');

            props.form.dob = `${year}-${monthStr}-${dayStr}`;
        });

        if (!props.form.dob) {
            const today = getToday();
            selectedYear.value = today.year.toString();
            selectedMonth.value = today.month.toString();
            selectedDay.value = today.day.toString();
            props.form.dob = `${today.year}-${String(today.month).padStart(2, '0')}-${String(today.day).padStart(2, '0')}`;
        } else {
            const date = new Date(props.form.dob);
            selectedYear.value = date.getFullYear().toString();
            selectedMonth.value = (date.getMonth() + 1).toString();
            selectedDay.value = date.getDate().toString();
        }

        const checkBeforeNext = () => {
            if (!fullName.value || !props.form.dob || !gender.value) {
                ElMessage.warning(t('Vui lòng nhập đầy đủ họ tên, ngày sinh và giới tính'));
                return false;
            }

            const today = new Date();
            const selectedDate = new Date(props.form.dob);

            if (selectedDate > today) {
                ElMessage.warning(t('Ngày sinh không hợp lệ (không thể ở tương lai)'));
                return false;
            }

            let age = today.getFullYear() - selectedDate.getFullYear();
            const monthDiff = today.getMonth() - selectedDate.getMonth();
            const dayDiff = today.getDate() - selectedDate.getDate();
            if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
                age--;
            }

            if (age < 13) {
                ElMessage.warning(t('Bạn phải từ 13 tuổi trở lên'));
                return false;
            }

            return true;
        };

        context.expose({
            checkBeforeNext,
        });

        return {
            t,
            fullName,
            gender,
            selectedDay,
            selectedMonth,
            selectedYear,
            daysInMonth,
            yearOptions
        };
    },
};
