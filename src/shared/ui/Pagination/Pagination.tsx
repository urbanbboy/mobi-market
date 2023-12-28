import { Button, ButtonTheme } from "@shared/ui/Button";
import cls from './Pagination.module.scss'

interface PaginationProps {
    onPageChange: (value: number) => void;
    totalPages: number;
    currentPage: number;
    totalItems: number;

}

export const Pagination = (props: PaginationProps) => {
    const { onPageChange, totalPages, currentPage } = props
    const renderPageNumbers = () => {
        const pageNumbers = []
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <Button
                    theme={currentPage === i ? ButtonTheme.CONTAINED_GREEN : ButtonTheme.OUTLINED}
                    key={i}
                    onClick={() => onPageChange(i)}
                    disabled={currentPage === i}
                    active={currentPage === i}
                >
                    {i}
                </Button>

            )
        }
        return pageNumbers;
    }

    return (
        <div className={cls.Buttons}>
            {renderPageNumbers()}
        </div>
    )
}
