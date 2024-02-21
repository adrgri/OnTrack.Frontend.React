type ProjectInfoModalProps = {
  readonly isOpen: boolean;
};

export default function ProjectInfoModal({ isOpen }: ProjectInfoModalProps) {
  return (
    <div>
      {isOpen && (
        <div>
          <h1>Project Info</h1>
        </div>
      )}
    </div>
  );
}
